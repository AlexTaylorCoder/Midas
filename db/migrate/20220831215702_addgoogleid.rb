class Addgoogleid < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :googleId, :string
  end
end
