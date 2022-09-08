class SwipeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :other_id

  def other_id
    User.find(object.other_id)
  end

end
