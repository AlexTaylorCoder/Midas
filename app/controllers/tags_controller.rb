class TagsController < ApplicationController
    def create
        Tag.create(permitted_params)
    end


    def permitted_params
        params.permit(:name)
    end
end
