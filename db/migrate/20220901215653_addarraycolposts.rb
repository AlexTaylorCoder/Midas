class Addarraycolposts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :points, :string, array: true, default: []
  end
end
