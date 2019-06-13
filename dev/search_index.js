var documenterSearchIndex = {"docs":
[{"location":"#TrackingHeaps-1","page":"TrackingHeaps","title":"TrackingHeaps","text":"","category":"section"},{"location":"#","page":"TrackingHeaps","title":"TrackingHeaps","text":"CurrentModule = TrackingHeaps\nDocTestSetup  = quote\n    using TrackingHeaps\nend","category":"page"},{"location":"#","page":"TrackingHeaps","title":"TrackingHeaps","text":"Modules = [TrackingHeaps]","category":"page"},{"location":"#TrackingHeaps.TrackingHeaps","page":"TrackingHeaps","title":"TrackingHeaps.TrackingHeaps","text":"TrackingHeaps offers a heap with a tracking system for the stored values.\n\nInserting a value into a TrackingHeap returns a tracker for the value. The tracker can be used to access, update, and delete the value without searching for it first. Heap order do not allow for O(log m) search (where m is the number of values currently stored inside the heap), just for O(m) search, so this feature allow for some performance gain if you need to manipulate values anywhere in the heap (not just on top of the heap). Besides access, which is O(1), update and delete are O(log m) as they may need to rebalance the tree.\n\nIf the tracking system is not needed, there is little reason to use this heap.\n\nI wrote this package because the MutableBinaryHeap of DataStructures.jl did not allow some behavior I wanted; behavior as:\n\na non-top value can be deleted without being made top first;\nconvenience methods allow to pop!/delete! stored values and immediatelly track! others, avoiding double-rebalancing;\nafter a value is deleted, its tracker can be re-reused to re-insert that value or insert a new value (but this is not done automatically);\nthe arity of the heap (binary, trinary, etc..) can be defined by the user (by parametric type) and inccur in minimal overhead (I hope);\nall the stored values are in a Vector{V} in heap order, for easy backdoor/hacking access;\nthe integer type that is the tracker type can be defined by the user.\n\n\n\n\n\n","category":"module"},{"location":"#TrackingHeaps.MaxHeapOrder","page":"TrackingHeaps","title":"TrackingHeaps.MaxHeapOrder","text":"MaxHeapOrder\n\nThe alternative type for the type parameter O (i.e., Order) of TrackingHeap. If used the heap will have the maximum value as top value.\n\nSee also: is_higher_than, TrackingHeap \n\n\n\n\n\n","category":"type"},{"location":"#TrackingHeaps.MinHeapOrder","page":"TrackingHeaps","title":"TrackingHeaps.MinHeapOrder","text":"MinHeapOrder\n\nThe default type for the type parameter O (i.e., Order) of TrackingHeap. If used the heap will have the minimum value as top value.\n\nSee also: is_higher_than, TrackingHeap \n\n\n\n\n\n","category":"type"},{"location":"#TrackingHeaps.NoTrainingWheels","page":"TrackingHeaps","title":"TrackingHeaps.NoTrainingWheels","text":"NoTrainingWheels\n\nThe alternative type for the type parameter S (i.e., Safety) of TrackingHeap. Inform the heap methods avoid any checking theoretically giving the best speed.\n\nSee also: SafeFromYourself\n\n\n\n\n\n","category":"type"},{"location":"#TrackingHeaps.SafeFromYourself","page":"TrackingHeaps","title":"TrackingHeaps.SafeFromYourself","text":"SafeFromYourself\n\nThe default type for the type parameter S (i.e., Safety) of TrackingHeap. Inform the heap methods to use @assert to check for any possible inconsistencies, and throw KeyError tried to access/delete/update an non-existent key.\n\nSee also: NoTrainingWheels\n\n\n\n\n\n","category":"type"},{"location":"#TrackingHeaps.TrackingHeap","page":"TrackingHeaps","title":"TrackingHeaps.TrackingHeap","text":"TrackingHeap{K, V, N, O, S} <: AbstractDict{K, V}\n\nThe type of a heap that has tracker/keys of type K (an integer), stored values of type V, that is N-ary (binary, trinary, etc...), with the order defined by O, and the safety level defined by S.\n\nEqual values are allowed but, if more than one value could be the top value, then any of the equal values may be there (they can yet be distinguished by tracker).\n\nThe TrackingHeap implements (almost) all methods described in Dict interface, and can be seen as a Dict (with the special property of always allowing for fast access to the minimal/maximal value and its key). There is an AbstractHeap of DataStructures, but it was designed for heaps without key, and then an AbstractMutableHeap interface (for heaps with keys) was grafted into it. Also, inheriting such interface would make necessary that this package used DataStructures just for inheriting its abstract type.\n\n\n\n\n\n","category":"type"},{"location":"#TrackingHeaps.TrackingHeap-Union{Tuple{Type{V}}, Tuple{V}} where V","page":"TrackingHeaps","title":"TrackingHeaps.TrackingHeap","text":"TrackingHeap(tracking_heap) # copy constructor\nTrackingHeap(::Type{V}; kwargs = ...)\n\nConstructs a TrackingHeap with default types for all type parameters except V (i.e., the stored values, that has no obvious default).\n\nThis constructor also accepts a variety of keyword arguments which allow to change the default type parameters and initialize the heap.\n\nThe constructor allow to initialize using: a values vector in heap order to be owned by the heap (no overhead, nor checking); a values iterable collection (the respective trackers should be assumed to be one(K):convert(K, length(number of initial values))); a pairs iterable collection. These options are mutually exclusive.\n\nSee also: MinHeapOrder, SafeFromYourself\n\nArguments\n\nK: The tracker keys type. Default: typeof(length(T[])).\nN: The N-arity of the heap. Default: binary (i.e, 2).\nO: The ordering of the heap values. Default: MinHeapOrder.\nS: The safety level of the heap methods. Default: SafeFromYourself.\ninit_val_heap: a Vector already in heap order. Default: empty.\ninit_val_coll: an initial collections of values to be copied. Default: empty.\ninit_pairs: an initial collection of pairs tracker-value to be copied. Default: empty.\n\n\n\n\n\n","category":"method"},{"location":"#TrackingHeaps.empty!!-Union{Tuple{TrackingHeap{K,V,N,O,S}}, Tuple{S}, Tuple{O}, Tuple{N}, Tuple{V}, Tuple{K}} where S where O where N where V where K","page":"TrackingHeaps","title":"TrackingHeaps.empty!!","text":"empty!!(heap) -> heap\n\nDelete all stored values efficiently (consider internals structure unused). O(1).\n\nCAUTION: this resets which trackers are considered \"never used\", so a call to next_tracker or track! after it will return the first tracker a newly created TrackingHeap gives (and so on).\n\nDo not guarantee that previous sizehint! or any vector growth have their effect negated.\n\nSee also: extract!, delete! track!\n\n\n\n\n\n","category":"method"},{"location":"#TrackingHeaps.extract!-Union{Tuple{S}, Tuple{O}, Tuple{N}, Tuple{V}, Tuple{K}, Tuple{TrackingHeap{K,V,N,O,S},K}} where S where O where N where V where K","page":"TrackingHeaps","title":"TrackingHeaps.extract!","text":"extract!(heap, trck) -> sval\n\nDelete the value referred by trck in the heap, and return it.\n\nThe trck can then be used to re-insert it, or to insert another value.\n\nThe heap may need to be rebalanced, so O(log m).\n\nSee also: delete!, empty!\n\n\n\n\n\n","category":"method"},{"location":"#TrackingHeaps.extract_and_push!-Union{Tuple{S}, Tuple{O}, Tuple{N}, Tuple{V}, Tuple{K}, Tuple{TrackingHeap{K,V,N,O,S},K,Pair{K,V}}} where S where O where N where V where K","page":"TrackingHeaps","title":"TrackingHeaps.extract_and_push!","text":"extract_and_push!(heap, old_trck, new_trck => new_sval) -> old_sval\n\nSimilar to extract_and_track! but let you define new_trck.\n\nCAUTION: guarantee that the value referred by old_trck will be extracted and the new pair will be pushed but does not guarantee that the internal heap structure will end up in the same state as calling extract! followed by push!.\n\nSee also: extract_and_track!, extract!\n\n\n\n\n\n","category":"method"},{"location":"#TrackingHeaps.extract_and_track!-Union{Tuple{S}, Tuple{O}, Tuple{N}, Tuple{V}, Tuple{K}, Tuple{TrackingHeap{K,V,N,O,S},K,V}} where S where O where N where V where K","page":"TrackingHeaps","title":"TrackingHeaps.extract_and_track!","text":"extract_and_track!(heap, old_trck, new_sval) -> (old_sval, new_trck)\n\nSimilar to calling extract! followed by track! but more optimized.\n\nCAUTION: guarantee that the value referred by old_trck will be extracted and the new value will be tracked but does not guarantee that the internal heap structure will end up in the same state as calling extract! followed by track!.\n\nSee also: pop_and_track!, extract!, track!,\n\n\n\n\n\n","category":"method"},{"location":"#TrackingHeaps.is_higher_than-Tuple{Type{MinHeapOrder},Any,Any}","page":"TrackingHeaps","title":"TrackingHeaps.is_higher_than","text":"is_higher_than(HeapOrderType, x, y) :: Bool\n\nTo define an ordering that is not the stored value type (i.e., V) default, you can create a new empty type and extend the is_higher_than function with a method that takes such empty type and returns if x should be higher in the heap than y based on it (so you do not need to wrap the value type inside a new type for a different ordering).\n\nNote that is_higher_than defaults to < and > instead of isless and !isless (that would be >=).\n\nAlso, if you do not want to provide a < and > for the stored value type, you can instead just define this function for ::Type{MinHeapOrder} (and/or ::Type{MaxHeapOrder}) and x-and-y of the specific types of the values compared.\n\nSee also: MinHeapOrder, MaxHeapOrder, TrackingHeap \n\n\n\n\n\n","category":"method"},{"location":"#TrackingHeaps.next_tracker-Union{Tuple{TrackingHeap{K,V,N,O,S}}, Tuple{S}, Tuple{O}, Tuple{N}, Tuple{V}, Tuple{K}} where S where O where N where V where K","page":"TrackingHeaps","title":"TrackingHeaps.next_tracker","text":"next_tracker(heap) -> trck\n\nReturn the same tracker the next call of track! would return, without modifying the heap in any way. O(1).\n\nSee also: track!\n\n\n\n\n\n","category":"method"},{"location":"#TrackingHeaps.pop_and_track!-Union{Tuple{S}, Tuple{O}, Tuple{N}, Tuple{V}, Tuple{K}, Tuple{TrackingHeap{K,V,N,O,S},V}} where S where O where N where V where K","page":"TrackingHeaps","title":"TrackingHeaps.pop_and_track!","text":"pop_and_track!(heap, new_sval) -> ((top_sval, top_trck), new_trck)\n\nSimilar to calling pop! followed by track! but more optimized.\n\nCAUTION: guarantee that the top will be popped and the new value will be tracked but does not guarantee that the internal heap structure will end up in the same state as calling pop! followed by track!.\n\nSee also: pop!, track!,\n\n\n\n\n\n","category":"method"},{"location":"#TrackingHeaps.pop_once_and_track_many!-Union{Tuple{S}, Tuple{O}, Tuple{N}, Tuple{V}, Tuple{K}, Tuple{TrackingHeap{K,V,N,O,S},Any}} where S where O where N where V where K","page":"TrackingHeaps","title":"TrackingHeaps.pop_once_and_track_many!","text":"pop_once_and_track_many!(heap, new_svals)::((top_sval,top_trck), new_trcks)\n\nSimilar to calling pop! once followed by many calls to track! but more optimized.\n\nCAUTION: guarantee that the top will be popped and the new values will be tracked but does not guarantee that the internal heap structure will end up in the same state as it would by calling pop! followed by calls to track! (in the same order given in the array).\n\nSee also: pop!, track!, pop_and_track!\n\n\n\n\n\n","category":"method"},{"location":"#TrackingHeaps.renew_tracker!-Union{Tuple{S}, Tuple{O}, Tuple{N}, Tuple{V}, Tuple{K}, Tuple{TrackingHeap{K,V,N,O,S},K}} where S where O where N where V where K","page":"TrackingHeaps","title":"TrackingHeaps.renew_tracker!","text":"renew_tracker!(heap, old_trck, new_trck = next_tracker(heap)) -> new_trck\n\nMarks old_trck as unused, begins using new_trck to refer to the value previously pointed by old_trck, and returns new_trck.\n\nDoes not need any rebalancing, O(1), but may inccur in memory allocation if new_trck was never used. The new_trck can be a tracker already used in the past, but must not be in use at the moment.\n\nSee also: pop_and_track!, update!, next_tracker, extract_and_track!\n\n\n\n\n\n","category":"method"},{"location":"#TrackingHeaps.top-Union{Tuple{TrackingHeap{K,V,N,O,S}}, Tuple{S}, Tuple{O}, Tuple{N}, Tuple{V}, Tuple{K}} where S where O where N where V where K","page":"TrackingHeaps","title":"TrackingHeaps.top","text":"top(heap) -> (sval, trck)\n\nReturns the \"highest\" value stored inside the heap and its tracker. O(1).\n\nSee also: is_higher_than\n\n\n\n\n\n","category":"method"},{"location":"#TrackingHeaps.track!-Union{Tuple{S}, Tuple{O}, Tuple{N}, Tuple{V}, Tuple{K}, Tuple{TrackingHeap{K,V,N,O,S},V}} where S where O where N where V where K","page":"TrackingHeaps","title":"TrackingHeaps.track!","text":"track!(heap, sval) -> trck\n\nInsert a new sval into the heap and return a new \"never used\" tracker for it.\n\nThe return is the same the method next_tracker would give if called before track!. The heap may need to be rebalanced, so O(log m).\n\nSee also: pop_and_track!, next_tracker, empty!!\n\n\n\n\n\n","category":"method"},{"location":"#TrackingHeaps.update!-Union{Tuple{S}, Tuple{O}, Tuple{N}, Tuple{V}, Tuple{K}, Tuple{TrackingHeap{K,V,N,O,S},K,V}} where S where O where N where V where K","page":"TrackingHeaps","title":"TrackingHeaps.update!","text":"update!(heap, trck, new_value) -> heap\nupdate!(heap, trck => new_value) -> heap\n\nUpdate the value pointed by trck. O(log m).\n\nSimilar to setindex! but assumes trck exists, if it does not, gives a KeyError when S === SafeFromYourself, and undefined behaviour when S !== SafeFromYourself.\n\nSee also: setindex!\n\n\n\n\n\n","category":"method"},{"location":"#Base.delete!-Union{Tuple{S}, Tuple{O}, Tuple{N}, Tuple{V}, Tuple{K}, Tuple{TrackingHeap{K,V,N,O,S},K}} where S where O where N where V where K","page":"TrackingHeaps","title":"Base.delete!","text":"delete!(heap, trck) -> heap\n\nDelete the value referred by trck in the heap, and return the heap.\n\nThe trck can then be used to re-insert it, or to insert another value.\n\nThe heap may need to be rebalanced, so O(log m).\n\nSee also: extract!, pop!\n\n\n\n\n\n","category":"method"},{"location":"#Base.empty!-Union{Tuple{TrackingHeap{K,V,N,O,S}}, Tuple{S}, Tuple{O}, Tuple{N}, Tuple{V}, Tuple{K}} where S where O where N where V where K","page":"TrackingHeaps","title":"Base.empty!","text":"empty!(heap) -> heap\n\nDelete all stored values efficiently (consider internals structure unused). O(1).\n\nCAUTION: this does not reset which trackers are considered \"never used\", so a call to next_tracker before empty! and another after will return the same.\n\nDo not guarantee that previous sizehint! or any vector growth have their effect negated.\n\nSee also: extract!, delete!, track!\n\n\n\n\n\n","category":"method"},{"location":"#Base.getindex-Union{Tuple{S}, Tuple{O}, Tuple{N}, Tuple{V}, Tuple{K}, Tuple{TrackingHeap{K,V,N,O,S},K}} where S where O where N where V where K","page":"TrackingHeaps","title":"Base.getindex","text":"getindex(heap, trck) -> sval\n\nReturn the value referred by trck in heap. O(1).\n\nOnly check if the tracker key exists if S === SafeFromYourself.\n\nSee also: setindex!\n\n\n\n\n\n","category":"method"},{"location":"#Base.isempty-Tuple{TrackingHeap}","page":"TrackingHeaps","title":"Base.isempty","text":"isempty(heap) :: Bool\n\nReturns true if the heap has no values stored; false otherwise. O(1).\n\n\n\n\n\n","category":"method"},{"location":"#Base.length-Union{Tuple{TrackingHeap{K,V,N,O,S}}, Tuple{S}, Tuple{O}, Tuple{N}, Tuple{V}, Tuple{K}} where S where O where N where V where K","page":"TrackingHeaps","title":"Base.length","text":"length(heap) :: K\n\nReturns the number of values currently stored inside the heap. O(1).\n\n\n\n\n\n","category":"method"},{"location":"#Base.pop!-Union{Tuple{TrackingHeap{K,V,N,O,S}}, Tuple{S}, Tuple{O}, Tuple{N}, Tuple{V}, Tuple{K}} where S where O where N where V where K","page":"TrackingHeaps","title":"Base.pop!","text":"pop!(heap) -> Pair(sval, trck)\n\nDelete the stored value at top of the heap, and return the tracker => value.\n\nThe trck can then be used to re-insert it, or to insert another value.\n\nThe heap may need to be rebalanced, so O(log m).\n\nSee also: extract!, delete!\n\n\n\n\n\n","category":"method"},{"location":"#Base.setindex!-Union{Tuple{S}, Tuple{O}, Tuple{N}, Tuple{V}, Tuple{K}, Tuple{TrackingHeap{K,V,N,O,S},V,K}} where S where O where N where V where K","page":"TrackingHeaps","title":"Base.setindex!","text":"setindex!(heap, new_value, trck) -> heap\n\nBegin tracking new_value using trck if such tracker is not yet in use, update the value pointed by trck if such tracker was already in use.\n\nWill rebalance the heap if necessary. O(log m). Note: a vector with length equal to the highest used trck is kept, so giving new_value and arbitrarily large tracker can cause massive (and unnecessary) memory use.\n\nSee also: update!\n\n\n\n\n\n","category":"method"},{"location":"#TrackingHeaps.last_child_ix-Union{Tuple{N}, Tuple{K}, Tuple{Val{N},K}} where N where K","page":"TrackingHeaps","title":"TrackingHeaps.last_child_ix","text":"last_child_ix\n\nInternal helper method. Do not use. Subject to change.\n\n\n\n\n\n","category":"method"},{"location":"#TrackingHeaps.parent_ix-Union{Tuple{N}, Tuple{K}, Tuple{Val{N},K}} where N where K","page":"TrackingHeaps","title":"TrackingHeaps.parent_ix","text":"parent_ix\n\nInternal helper method. Do not use. Subject to change.\n\n\n\n\n\n","category":"method"},{"location":"#TrackingHeaps.sift!-Union{Tuple{S}, Tuple{O}, Tuple{N}, Tuple{V}, Tuple{K}, Tuple{TrackingHeap{K,V,N,O,S},K,V}} where S where O where N where V where K","page":"TrackingHeaps","title":"TrackingHeaps.sift!","text":"sift!(heap, ix, previous_sval)\n\nInternal use. May be documented in the future. Avoid use unless strictly necessary.\n\n\n\n\n\n","category":"method"},{"location":"#TrackingHeaps.sift_down!-Union{Tuple{S}, Tuple{O}, Tuple{N}, Tuple{V}, Tuple{K}, Tuple{TrackingHeap{K,V,N,O,S},K}} where S where O where N where V where K","page":"TrackingHeaps","title":"TrackingHeaps.sift_down!","text":"sift_down!(heap, ix)\n\nInternal use. May be documented in the future. Avoid use unless strictly necessary.\n\n\n\n\n\n","category":"method"},{"location":"#TrackingHeaps.sift_up!-Union{Tuple{S}, Tuple{O}, Tuple{N}, Tuple{V}, Tuple{K}, Tuple{TrackingHeap{K,V,N,O,S},K}} where S where O where N where V where K","page":"TrackingHeaps","title":"TrackingHeaps.sift_up!","text":"sift_up!(heap, ix)\n\nInternal use. May be documented in the future. Avoid use unless strictly necessary.\n\n\n\n\n\n","category":"method"}]
}
