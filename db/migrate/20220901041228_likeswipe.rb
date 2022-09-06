class Likeswipe < ActiveRecord::Migration[6.1]
  def change
    add_column :swipes, :like, :boolean
  end
end
