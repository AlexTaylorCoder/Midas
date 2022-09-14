class ChannelsController < ApplicationController
    before_action :find_channels, only: [:index]
    def index
        if @channels.to_a.empty?
            render json: {error:"No channels"}
        else
            render json: @channels, each_serializer: ChannelPreviewSerializer
        end
    end

    def show 
        render json: Channel.find(params[:id])
    end

    private

    def find_channels
        @channels = Channel.where("user_id = ? OR match_id = ?",current_user.id,current_user.id)
    end
end
