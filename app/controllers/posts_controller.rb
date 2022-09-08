class PostsController < ApplicationController
    def create
        Post.create!(post_params)

        #total likes with .count
        #how wow to get total swipes?
        updated_points = []
        current_user.avg_points.zip(params[:points]).each do |avg_point,new_point|
            updated_points << (avg_point + new_point) /2
        end

        User.update(avg_points:updated_points)
    end

    private

    def post_params 
        params.permit(:points,:post_img)
    end
end
