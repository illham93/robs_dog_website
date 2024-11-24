class CreateEventSignups < ActiveRecord::Migration[6.1]
  def change
    create_table :event_signups do |t|
      t.references :user, null: false, foreign_key: true
      t.references :event, null: false, foreign_key: true

      t.timestamps
    end

    add_index :event_signups, [:user_id, :event_id], unique: true
  end
end
