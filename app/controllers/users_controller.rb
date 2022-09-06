class UsersController < ApplicationController
    def create 
        #Rember to match frontend also!
        user = User.create!(user_params)
        #convert array of objects to 2d array 
        user.posts.create!(params.permit(:post_img,:points))
        user.swipes.create!(user_id:user.id,other_id:user.id)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def position
        current_user.update(update_location_params)
        head :no_content
    end

    def index
        render json: User.all
    end

    def update
        current_user.update!(update_profile_params)
    end

    def batch
        #Finan district 40.706362, -74.008303
        #central harlem 40.819689, -73.941480      
        usersArr = find_location()
        #Facial matching
        analyzed = find_face_points(usersArr) 
        #limit 10
        render json: analyzed
    end

    def map_users
        render json: find_location.flatten
    end

    def show
        render json: current_user
    end

    def destroy
        head :no_content
    end


    private

    def find_face_points (usersArr)
        if (!current_user.pref_points.empty?)

            hash_points = {}
            usersArr_length = usersArr.length
            #Need preffered points col to compare to 
            usersArr.each_with_index do |user_range,index|
                user_range.each do |user|
                    init_diff_x = user.avg_points[0][0] - @user.pref_points[0][0]
                    init_diff_y = user.avg_points[0][1] - @user.pref_points[0][1]

                    init_point_diff = (diff_x + diff_y) / 2 

                    count_point_diff = init_point_diff

                    user.avg_points[0][1] - user.pref_points[0][1]
                    user.avg_points.zip(current_user.pref_points).each do |new_coords,pref_coords|
                        
                        diff_x = (new_coords[0] - pref_coords[0]).abs / (new_coords[0] + pref_coords[0] / 2)
                        diff_y = (new_coords[1] - pref_coords[1]).abs / (new_coords[1] + pref_coords[1] / 2)

                        point_diff = (diff_x + diff_y) / 2 
                        count_point_diff = (point_diff + count_point_diff) / 2
                        # pref_coords[0] += new_coords[0] - pref_coords[0] / @user.total_likes
                        # pref_coords[1] += new_coords[0] - pref_coords[0] / @user.total_likes
                    end
                    #Higher index decreases diff, lower increases diff
                    overall_diff = count_point_diff + (usersArr_length - index / 10)
                    hash_points[user] = overall_diff
                end
            end
            #Find 10 with lowest diff
            lowest_diff = hash_points.sort_by{|key,value| value}.first(10).to_h
            lowest_diff
        else  
            usersArr.flatten
        end
    end

    def find_location()
        user_lat = current_user.lat
        user_lng = current_user.lng
        upper_range = current_user.upper_range

        lower_range = 0

        usersArr = []
        #For range selection change upper range
        count = 0
        until usersArr.length > 3 do
            count+=1 
            if count > 20
                break
            end
            users = User.in_range(lower_range...upper_range, origin:[user_lat,user_lng]).where(gender: current_user.pref_gender)
            .includes(:swipes).where.not(swipes: {user_id:current_user.id}).to_a
            if !users.empty?
                usersArr << users
            end
            lower_range = upper_range
            upper_range = upper_range * 2
        end
        usersArr
    end

    def update_location_params
        params.permit(:lat,:lng)
    end
    def update_profile_params
        params.permit(:first_name,:last_name,:age,:email,:gender,:bio,:password,:phone,:pref_gender,:image,:upper_range)
    end

    def user_params
        params.permit(:first_name,:last_name,:password,:email,:phone,:birthday,:image,:googleId,:bio,:pref_gender,:gender,:avg_points)
    end
end