class User < ApplicationRecord

    has_secure_password
    acts_as_mappable

    has_one_attached :image
    has_many :posts
    has_many :swipe_records
    has_many :swipes
    has_many :messages 
    has_many :channels, through: :messages
    
    has_many :tag_merges
    has_many :tags, through: :tag_merges
end
