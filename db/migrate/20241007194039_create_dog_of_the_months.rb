class CreateDogOfTheMonths < ActiveRecord::Migration[6.1]
  def change
    create_table :dog_of_the_months do |t|
      t.string :call_name
      t.string :registered_name
      t.string :about
      t.string :titles
      t.string :owner
      t.string :image_url
      t.timestamps
    end
  end
end
