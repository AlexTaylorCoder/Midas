class CreateTagMerges < ActiveRecord::Migration[6.1]
  def change
    create_table :tag_merges do |t|
      t.integer :tag_id
      t.integer :user_id

      t.timestamps
    end
  end
end
