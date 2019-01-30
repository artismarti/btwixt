class CreateMeetingVenues < ActiveRecord::Migration[5.2]
  def change
    create_table :meeting_venues do |t|
      t.boolean :selected
      t.references :meeting, foreign_key: true
      t.references :venue, foreign_key: true

      t.timestamps
    end
  end
end
