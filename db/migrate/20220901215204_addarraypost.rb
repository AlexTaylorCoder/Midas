class Addarraypost < ActiveRecord::Migration[6.1]
  def change
    remove_column :posts, :points
    remove_column :posts, :image
    remove_column :users, :lat
    remove_column :users, :lng
  end
end
