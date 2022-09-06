class Otheridswipes < ActiveRecord::Migration[6.1]
  def change
    add_column :swipes, :other_id, :integer
  end
end
