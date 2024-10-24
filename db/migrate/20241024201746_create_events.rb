class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :title
      t.text :description
      t.date :date
      t.time :start_time
      t.time :end_time
      t.string :location
      t.boolean :multi_day
      t.timestamps
    end
  end
end
