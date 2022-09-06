class PostsController < ApplicationController
    def create
        Post.create!(post_params)

        #total likes with .count
        #how wow to get total swipes?
        current_user.avg_points.zip(params[:points]).each do |avg_coords,new_coords|
            avg_coords[0] = new_coords[0] + avg_coords[0] / 2
            avg_coords[1] = new_coords[1] + avg_coords[1] / 2
        end

        User.update(avg_points:current_user.avg_points)
    end

    private

    def post_params 
        params.permit(:points,:post_img)
    end
end
