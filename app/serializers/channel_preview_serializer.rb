class ChannelPreviewSerializer < ActiveModel::Serializer
  attributes :id, :caption, :last_message, :image

  # has_many :users

  def last_message
    if object.messages
        object.messages.last

    end
  end

  def image
    match = User.find(object.match_id)
    Rails.application.routes.url_helpers.rails_blob_path(match.image.variant(:thumb),host: "local")
    # byebug
  end

end
