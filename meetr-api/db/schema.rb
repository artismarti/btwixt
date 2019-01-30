# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_01_28_140137) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "meeting_venues", force: :cascade do |t|
    t.boolean "selected"
    t.bigint "meeting_id"
    t.bigint "venue_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["meeting_id"], name: "index_meeting_venues_on_meeting_id"
    t.index ["venue_id"], name: "index_meeting_venues_on_venue_id"
  end

  create_table "meetings", force: :cascade do |t|
    t.string "title"
    t.float "midpoint_latitude"
    t.float "midpoint_longitude"
    t.datetime "date_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_meetings", force: :cascade do |t|
    t.float "start_latitude"
    t.float "start_longitude"
    t.string "user_status"
    t.string "start_address"
    t.bigint "user_id"
    t.bigint "meeting_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["meeting_id"], name: "index_user_meetings_on_meeting_id"
    t.index ["user_id"], name: "index_user_meetings_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.boolean "guest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "venues", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "meeting_venues", "meetings"
  add_foreign_key "meeting_venues", "venues"
  add_foreign_key "user_meetings", "meetings"
  add_foreign_key "user_meetings", "users"
end
