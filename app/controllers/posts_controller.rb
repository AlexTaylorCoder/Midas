class PostsController < ApplicationController
    def create

        current_user.create!(post_params)
        #total likes with .count
        #how wow to get total swipes?
        updated_points = []
        current_user.avg_points.zip(params[:points]).each do |avg_point,new_point|
            updated_points << (avg_point + new_point) /2
        end

        current_user.update(avg_points:updated_points)
    end

    def create_many

        params[:images].each do |image|
            current_user.posts.create!(post_img:image)
        end
        #iterate through array and create new post for each element in array
    end

    private

    def post_params 
        params.permit(:points,:post_img)
    end
end
