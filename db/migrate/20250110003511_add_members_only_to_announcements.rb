class AddMembersOnlyToAnnouncements < ActiveRecord::Migration[6.1]
  def change
    add_column :announcements, :members_only, :boolean, default: false
  end
end
