class Tag < ApplicationRecord
    has_many :tag_merges
    has_many :users, through: :tag_merges

    validates :name, uniqueness: true
    validates :name, presence: true
end
