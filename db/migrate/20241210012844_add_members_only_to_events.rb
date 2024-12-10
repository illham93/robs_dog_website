class AddMembersOnlyToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :members_only, :boolean, default: false
  end
end
