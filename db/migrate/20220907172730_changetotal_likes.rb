class ChangetotalLikes < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :total_likes
    add_column :users, :total_likes, :integer, default: 1
  end
end
