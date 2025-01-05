class AddStatusToEventSignups < ActiveRecord::Migration[6.1]
  def change
    add_column :event_signups, :status, :string, default: 'pending'
  end
end
