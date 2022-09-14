class MessagesController < ApplicationController
    
    def create
        message = Message.create(text:params[:text],channel_id:params[:channel_id],user_id:current_user.id)
        message.broadcast
        render json: message
    end
end
