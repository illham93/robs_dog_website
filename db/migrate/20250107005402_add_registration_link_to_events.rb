class AddRegistrationLinkToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :registration_link, :string
  end
end
