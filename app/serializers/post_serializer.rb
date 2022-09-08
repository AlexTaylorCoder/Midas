class PostSerializer < ActiveModel::Serializer
  attributes :id, :text, :image_url

  def image_url 
    if object.post_img.attached?
      Rails.application.routes.url_helpers.rails_blob_path(object.post_img.variant(:medium), host: "local")
    end
  end

end
