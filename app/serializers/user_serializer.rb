class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :age, :email, :coords, :gender, :bio, :image_url, :pref_gender, :upper_range

  has_many :posts
  has_many :tags

  def image_url 
    if object.image.attached?
      #      Rails.application.routes.url_helpers.rails_representation_url(object.image.variant(resize: "300x300").processed, only_path: true)
      Rails.application.routes.url_helpers.rails_blob_path(object.image.variant(:thumb),host: "local")
    end
  end
  def age 
    (Date.today - Date.parse(object.birthday.to_s)).to_i / 365
  end
  def coords 
    {lat:object.lat.to_f,lng:object.lng.to_f}
  end
end
