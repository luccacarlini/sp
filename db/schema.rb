# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160816201022) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "annotations", force: :cascade do |t|
    t.integer  "author_id",            null: false
    t.integer  "track_id",             null: false
    t.text     "body",                 null: false
    t.integer  "referent_start_index", null: false
    t.integer  "referent_end_index",   null: false
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  add_index "annotations", ["author_id"], name: "index_annotations_on_author_id", using: :btree
  add_index "annotations", ["track_id"], name: "index_annotations_on_track_id", using: :btree

  create_table "comments", force: :cascade do |t|
    t.integer  "author_id",        null: false
    t.string   "commentable_type", null: false
    t.text     "body",             null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.integer  "commentable_id",   null: false
  end

  add_index "comments", ["author_id"], name: "index_comments_on_author_id", using: :btree

  create_table "tracks", force: :cascade do |t|
    t.string   "title",              null: false
    t.string   "artist",             null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.text     "lyrics",             null: false
    t.integer  "submitter_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "album"
  end

  add_index "tracks", ["submitter_id"], name: "index_tracks_on_submitter_id", using: :btree
  add_index "tracks", ["title", "artist"], name: "index_tracks_on_title_and_artist", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  create_table "votes", force: :cascade do |t|
    t.integer  "value",         null: false
    t.integer  "voter_id",      null: false
    t.integer  "annotation_id", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "votes", ["annotation_id"], name: "index_votes_on_annotation_id", using: :btree
  add_index "votes", ["value", "voter_id", "annotation_id"], name: "index_votes_on_value_and_voter_id_and_annotation_id", unique: true, using: :btree

end
