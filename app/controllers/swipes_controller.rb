class SwipesController < ApplicationController
    #Every swipe send this to db
    #Get session_id user has many seen 
    #Every swipe add seen flag to users own swiperecords
    #And add like true/false to other user 

    def create
        # @user.swiperecords.create(other_id:params.permit(:user_id),seen:true)
        if params[:like] == true 
            current_user.update(total_likes: current_user.total_likes+1)
        end
        Swipe.create!(user_id:params[:user_id],like:params{:like},other_id:current_user.id)
    end

    private

    def swipe_params
        params.permit(:user_id,:like)
    end
end
