class ChannelPreviewSerializer < ActiveModel::Serializer
  attributes :id, :caption, :last_message, :swiped_user

  has_many :users

  def swiped_user
    object.users.where.not(id: session[:user_id])
  end

  def last_message
    object.messages.last
  end

end
