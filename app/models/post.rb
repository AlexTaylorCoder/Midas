class Post < ApplicationRecord
    has_one_attached :post_img

    belongs_to :user
end
