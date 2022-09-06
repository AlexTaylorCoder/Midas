class AddTotalLikesUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :total_likes, :integer
  end
end
