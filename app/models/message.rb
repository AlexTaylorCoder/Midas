class Message < ApplicationRecord
    belongs_to :channel 
    belongs_to :user

    def broadcast
        ActionCable.server.broadcast("room_#{self.channel_id}", MessageSerializer.new(self))
    end
end
