class MessageSerializer < ActiveModel::Serializer
  attributes :id, :text, :user_id, :updated_at

  # belongs_to :user
  # def user_id
  #   if object.user.id != current_user.id
  #     object.user.id
  #   end
  # end

end
