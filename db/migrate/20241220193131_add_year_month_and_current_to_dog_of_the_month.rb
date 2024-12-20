class AddYearMonthAndCurrentToDogOfTheMonth < ActiveRecord::Migration[6.1]
  def change
    add_column :dog_of_the_months, :year, :integer
    add_column :dog_of_the_months, :month, :integer
    add_column :dog_of_the_months, :current, :boolean
  end
end
