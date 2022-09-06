class TagMergesController < ApplicationController

    def create

    end

    def update
        
    end

    def destroy
        current_user.destroy
        head :no_content
    end

    private

    def permitted_params
        params.permit(:tag_id)
    end
end
