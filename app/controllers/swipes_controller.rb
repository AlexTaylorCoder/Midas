class SwipesController < ApplicationController
    #Every swipe send this to db
    #Get session_id user has many seen 
    #Every swipe add seen flag to users own swiperecords
    #And add like true/false to other user 

    def create
        # if User.find(swiped_user_id).swipes.find_by(other_id:current_user.id)
        #Need to manage duplicate swipes

        swiped_user = User.find(params[:user_id])

        swipe = current_user.swipes.find_by(other_id: swiped_user.id)
        
        
        if swipe
            if swipe.like == true && params[:like] == true

                user_name = swiped_user.first_name 

                channel = Channel.find_or_create_by(caption: user_name, user_id:current_user.id, match_id:swiped_user.id)

                swipe.update(match: true)
                

                adjust_avg_points(swiped_user.avg_points)
                render json: channel
            else
                swipe.update(match:false)
            end
        end
        Swipe.find_or_create_by(user_id:swiped_user.id,like:params[:like],other_id:current_user.id)

        updated_likes = current_user.total_likes + 1
        current_user.update(total_likes: updated_likes)
    end

    def index   
        render json: current_user.swipes
    end

    private

    def swipe_params
        params.permit(:user_id,:like)
    end

    def adjust_avg_points swiped_user_points
        if current_user.pref_points.length != 135
            current_user.update(pref_points: swiped_user_points)
        else
            updated_points = []
            current_user.pref_points.zip(swiped_user_points).each do |avg_point,new_point|
                updated_points << (new_point + avg_point) / 2
            end
            current_user.update(pref_points:updated_points)
        end
    end
end
