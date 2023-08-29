By end of Aug 2023, the author of this repository decided to abandon 
GitHub (Microsoft and 2FA shenaningans) and adopt CodeBerg. While not 
deleted, there is no guarantee the GitHub repo is updated. Check the 
official repo at: https://codeberg.org/hbecker/TrackingHeaps.jl

# TrackingHeaps

![Lifecycle](https://img.shields.io/badge/lifecycle-experimental-orange.svg)<!--
![Lifecycle](https://img.shields.io/badge/lifecycle-maturing-blue.svg)
![Lifecycle](https://img.shields.io/badge/lifecycle-stable-green.svg)
![Lifecycle](https://img.shields.io/badge/lifecycle-retired-orange.svg)
![Lifecycle](https://img.shields.io/badge/lifecycle-archived-red.svg)
![Lifecycle](https://img.shields.io/badge/lifecycle-dormant-blue.svg) -->
[![Build Status](https://travis-ci.com/henriquebecker91/TrackingHeaps.jl.svg?branch=master)](https://travis-ci.com/henriquebecker91/TrackingHeaps.jl)
[![codecov.io](http://codecov.io/github/henriquebecker91/TrackingHeaps.jl/coverage.svg?branch=master)](http://codecov.io/github/henriquebecker91/TrackingHeaps.jl?branch=master)

Check the complete documentation here: https://henriquebecker91.github.io/TrackingHeaps.jl/latest/

TrackingHeaps offers a heap with a tracking system for the stored values.

Inserting a value into a TrackingHeap returns a tracker for the value. The
tracker can be used to access, update, and delete the value without searching
for it first. Heap order do not allow for `O(log m)` search (where `m` is the
number of values currently stored inside the heap), just for `O(m)` search, so
this feature allow for some performance gain if you need to manipulate values
anywhere in the heap (not just on top of the heap). Besides access, which is
`O(1)`, update and delete are `O(log m)` as they may need to rebalance the
tree.

If the tracking system is not needed, there is little reason to use this heap.

I wrote this package because the MutableBinaryHeap of DataStructures.jl did not
allow some behavior I wanted; behavior as:
1) a non-top value can be deleted without being made top first;
2) convenience methods allow to `pop!`/`delete!` stored values and
   immediatelly `track!` others, avoiding double-rebalancing;
3) after a value is deleted, its tracker can be re-reused to re-insert
   that value or insert a new value (but this is not done automatically);
4) the arity of the heap (binary, trinary, etc..) can be defined by the
   user (by parametric type) and inccur in minimal overhead (I hope);
5) all the stored values are in a `Vector{V}` in heap order, for easy
   backdoor/hacking access;
6) the integer type that is the tracker type can be defined by the user.

A soft introduction to the package will be written here in the future.

