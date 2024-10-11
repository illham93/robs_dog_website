class AddMemberDetailsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :member, :boolean, default: false
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :phone, :string
    add_column :users, :town, :string
  end
end
