class Changearraydec < ActiveRecord::Migration[6.1]
  def change
    remove_column :posts, :points
    add_column :posts, :points, :decimal, array: true, default: []
  end
end
