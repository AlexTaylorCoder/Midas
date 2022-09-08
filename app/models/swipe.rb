class Swipe < ApplicationRecord
    belongs_to :user
    
    # validates :other_id, uniqueness: true
end
