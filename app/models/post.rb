class Post < ApplicationRecord
    has_one_attached :post_img do |attach|
        attach.variant :medium, resize_to_limit: [500,650]
    end

    belongs_to :user
end
