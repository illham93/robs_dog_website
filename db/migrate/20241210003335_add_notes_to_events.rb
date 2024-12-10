class AddNotesToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :notes, :string
  end
end
