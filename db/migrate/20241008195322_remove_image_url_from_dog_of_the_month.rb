class RemoveImageUrlFromDogOfTheMonth < ActiveRecord::Migration[6.1]
  def change
    remove_column :dog_of_the_months, :image_url, :string
  end
end
