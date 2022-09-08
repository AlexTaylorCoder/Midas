class SwipesController < ApplicationController
    #Every swipe send this to db
    #Get session_id user has many seen 
    #Every swipe add seen flag to users own swiperecords
    #And add like true/false to other user 

    def create
        # byebug
        swiped_user_id = params[:user_id]
        if params[:like] == true 
            updated_likes = current_user.total_likes + 1
            current_user.update(total_likes: updated_likes)
            swiped_user_points = User.find(swiped_user_id).avg_points

            if current_user.pref_points.length != 135
                current_user.update(pref_points: swiped_user_points)
            else
                updated_points = []
                current_user.pref_points.zip(swiped_user_points).each do |avg_point,new_point|
                    updated_points << (new_point + avg_point) / 2
                end
            end
            current_user.update(pref_points:updated_points)
        end
        Swipe.create!(user_id:swiped_user_id,like:params[:like],other_id:current_user.id)

        if User.find(swiped_user_id).swipes.find_by(other_id: current_user.id)
            user_name = User.find(swiped_user_id).first_name 
            channel = Channel.create(caption: user_name)
            render json: channel
        end
    end

    def index   
        render json: current_user.swipes
    end

    private

    def swipe_params
        params.permit(:user_id,:like)
    end
end
