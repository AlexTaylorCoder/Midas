class ChannelsController < ApplicationController
    def index
        render json: current_user.channels, Serializer: ChannelPreviewSerializer
    end
end
