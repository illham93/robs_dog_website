class AddExpiryDateToSponsors < ActiveRecord::Migration[6.1]
  def change
    add_column :sponsors, :expiry_date, :date
  end
end
