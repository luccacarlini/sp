# == Schema Information
#
# Table name: votes
#
#  id            :integer          not null, primary key
#  value         :integer          not null
#  voter_id      :integer          not null
#  annotation_id :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Vote < ActiveRecord::Base
  validates :value, :voter_id, :annotation_id, presence: true;
  validates :value, uniqueness: {scope: [:annotation, :voter]}
  validates_inclusion_of :value, in: [1, -1]

  belongs_to :voter,
    class_name: "User",
    primary_key: :id,
    foreign_key: :voter_id

  belongs_to :annotation,
    class_name: "Annotation",
    primary_key: :id,
    foreign_key: :annotation_id
end
