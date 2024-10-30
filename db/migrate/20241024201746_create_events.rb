class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :title
      t.text :description
      t.date :date
      t.string :start_time
      t.string :end_time
      t.string :location
      t.boolean :multi_day
      t.timestamps
    end
  end
end
