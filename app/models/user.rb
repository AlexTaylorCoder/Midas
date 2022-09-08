class User < ApplicationRecord

    has_secure_password
    acts_as_mappable

    # validates :email, uniqueness: true
    # validates :phone, uniqueness: true
    # # validates :googleId, uniqueness: true
    # validates :first_name, :last_name, :birthday, :gender, :pref_gender, presence: true
    # validate :age


    def age
        if ((Date.today - Date.parse(self.birthday.to_s)).to_i / 365) < 18
            errors.add(:birthday,"Must be over 18")
        end
    end

    has_one_attached :image do |attach|
        attach.variant :thumb, resize_to_limit: [100,100]
    end
    has_many :posts
    # has_many :swipe_records
    has_many :swipes
    has_many :messages 
    has_many :channels, through: :messages
    
    has_many :tag_merges
    has_many :tags, through: :tag_merges
end
