class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.string :text
      t.integer :user_id
      t.integer :channel_id

      t.timestamps
    end
  end
end
